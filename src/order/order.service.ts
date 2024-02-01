import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';

@Injectable()
export class OrderService {
  private prisma :PrismaClient

  constructor(private referenceNumberGeneratorService: ReferenceNumberGeneratorService) {
    this.prisma = new PrismaClient();
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const { customerId, supplierId, orderDetails, totalPrice, tax, status, shippingCost } = input;
    const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();

    const createdOrder = await this.prisma.order.create({
      data: {
        customerId,
        supplierId,
        totalPrice,
        shippingCost,
        tax,
        status,
        referenceNumber,
        orderDetails: {
          create: orderDetails.map(detail => ({
            title: detail.title,
            price: detail.price,
            quantity: detail.quantity,
            product: { connect: { id: detail.productId } },
          })),
        },
      },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
      
    });
  
   /* const order: Order = {
      ...createdOrder,
      orderDetails: createdOrder.orderDetails,
    };*/
    const order: Order = {
      ...createdOrder,
      orderDetails: createdOrder.orderDetails,
      suppliers: [], // Add an empty array or provide the actual suppliers data here
      customer:[],


    };
    // Update product status
    for (const detail of orderDetails) {
      await this.prisma.product.update({
        where: { id: detail.productId },
        data: { status: 'confirmed' },
      });
    }
    const notification = await this.prisma.notification.create({
      data: {
        type: 'order',
        message: 'A new order has been created.',
        recipientId: supplierId, // ID of the supplier who should receive the notification
        status:"new"
      },
    });
    return order;
  }
  /*async createOrder(input: CreateOrderInput): Promise<Order> {
    const { customerId, supplierId, orderDetails, totalPrice, tax, status, shippingCost } = input;
    const createdOrder = await this.prisma.order.create({
      data: {
        customerId,
        supplierId,
        totalPrice,
        shippingCost,
        tax,
        status,
        orderDetails: {
          create: orderDetails.map(detail => ({
            title: detail.title,
            price: detail.price,
            quantity: detail.quantity,
            product: { connect: { id: detail.productId } }, // Connect the product by its ID
            
          })),
        },
      },
      include: {
        orderDetails: {
          include: {
            product: true, // Include the associated product data
          },
        },
      },
    });
  
    const order: Order = {
      ...createdOrder,
      orderDetails: createdOrder.orderDetails,
    };
    await this.prisma.product.update({
      where: { id: 1 },
      
      data: {
        status: 'comformed'
      },
    });
    return order;
  }*/
   /* await this.prisma.quotation.update({
      where: { id: 13 },
       include: {
      productPrices: {
        where: {
          product: {
            status: "wait",
          },
        },
      },
    },
    });
    /*await this.prisma.quotation.update({
      where: { id: 13 },
      data: {
        productPrices: {
          updateMany: {
            where: {
              productId: {
                in: orderDetails.map(detail => detail.productId),
              },
            },
            data: {
              status: "ordered",
            },
          },
        },
      },
      include: {
        productPrices: true,
      },
    });
    return order;
  }*/
 /* async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({ 
      include: {
         orderDetails: 
      {
        include: {
          product: true,
        },
        
      }
    },
  
  });
  }*/
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          orderDetails: {
            include: {
              product: true,
            },
          },
          supplier: {
            include: {
              user: true,
            },
          },
          purchaseRequest: { // Include the required properties of purchaseRequest
            include: {
              user: true,
              products: true,
              suppliers: true,
            },
          },
        },
      });
  
      const formattedOrders: Order[] = orders.map(order => ({
        ...order,
        suppliers: [],
        customer:[],
        purchaseRequest: order.purchaseRequest,
      }));
  
      return formattedOrders;
    } catch (error) {
      console.error('Error retrieving orders:', error);
      return [];
    }
  }
 /* async getOrderById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderDetails:  {
          include: {
            product: true,
          },
        } 
      },
    });
    if (!order) {
      // Handle the case where the order is not found
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }*/
  async  getOrderById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        supplier:{
          include:{
            user:true,
          }
        },
        customer:true,
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: {
              include:{
                user:true,
              }
            },
          },
        },
      },
    });
    
    if (!order) {
      // Handle the case where the order is not found
      throw new Error(`Order with ID ${id} not found`);
    }
    const suppliers = order.purchaseRequest.suppliers.map(supplier => ({
      id:supplier.id,
      name: supplier.name,
      categoryId: supplier.categoryId,
      user: supplier.user,
      userId: supplier.userId,
    }));
    const customer = order.purchaseRequest.suppliers.map(supplier => ({
      id:supplier.id,
      name: supplier.name,
      categoryId: supplier.categoryId,
      user: supplier.user,
      userId: supplier.userId,
    }));
    const orderWithSuppliers: Order = {
      ...order,
      suppliers, 
      customer,
      
    };
  
    return orderWithSuppliers;
  }
  /*
  async getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]> {
    const orderDetails = await this.prisma.orderDetail.findMany({
      where: { orderId },
      include: { product: true }, // Include the product relation
    });
  
    if (!orderDetails || orderDetails.length === 0) {
      // Handle the case where the order details are not found
      throw new Error(`Order details with orderId ${orderId} not found`);
    }
  
    return orderDetails;
  }*/
  /*async getOrderBySupplierId(supplierId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { supplierId },
      include: { orderDetails: {
        include:{
          product:true,
        }
      } },
      orderBy: {
        id: 'desc'
      }
    });

    if (!orders) {
      throw new Error(`No orders found for supplier with ID ${supplierId}`);
    }

    return orders;
  }*/
  async  getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]> {
    const orderDetails = await this.prisma.orderDetail.findMany({
      where: { orderId },
      include: { product: true }, // Include the product relation
    });
  
    if (!orderDetails || orderDetails.length === 0) {
      // Handle the case where the order details are not found
      throw new Error(`Order details with orderId ${orderId} not found`);
    }
  
    return orderDetails;
  }
  async  getOrderBySupplierId(supplierId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
    //  where: { supplierId },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        supplier:{
           include:{
            user:{
              where:{
                id:supplierId
              }
            }
           }
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const ordersWithSuppliers = orders.map(order => ({
      ...order,
      suppliers: [], // Add an empty array or provide the actual suppliers data here
      customer:[],

    }));
  
    if (ordersWithSuppliers.length === 0) {
      throw new Error(`No orders found for supplier with ID ${supplierId}`);
    }
  
    return ordersWithSuppliers;
  }
 /* async getOrderByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: { orderDetails: {
        include:{
          product:true
        }
      } },
      orderBy: {
        id: 'desc'
      }
    });

    if (!orders) {
      throw new Error(`No orders found for supplier with ID ${customerId}`);
    }

    return orders;
  }*/
  async  getApprovedOrderByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { 
        customerId,
        status:'approved'
       },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const ordersWithSuppliers = orders.map(order => ({
      ...order,
      suppliers: [], // Add an empty array or provide the actual suppliers data here
      purchaseRequests:[],
      customer:[],

      
    }));
  
    if (ordersWithSuppliers.length === 0) {
      throw new Error(`No orders found for customer with ID ${customerId}`);
    }
  
    return ordersWithSuppliers;
  }
  async  getOrderByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const ordersWithSuppliers = orders.map(order => ({
      ...order,
      suppliers: [], // Add an empty array or provide the actual suppliers data here
      purchaseRequests:[],
      customer:[],

      
    }));
  
    if (ordersWithSuppliers.length === 0) {
      throw new Error(`No orders found for customer with ID ${customerId}`);
    }
  
    return ordersWithSuppliers;
  }
  /*async updateOrder(id: number, status: string): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: status },
      include: { orderDetails: { include: { product: true } } }, // Include orderDetails and product relation
    });
  
    return updatedOrder;
  }*/
  async  updateOrder(id: number, status: string): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: status },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
    });
  
    const orderWithSuppliers: Order = {
      ...updatedOrder,
      suppliers: [], // Add an empty array or provide the actual suppliers data here
      customer:[],
    };
    const notification = await this.prisma.notification.create({
      data: {
        type: 'order',
        message: 'A new order  has been created.',
        recipientId: 1, // ID of the supplier who should receive the notification
        status:"new"
      },
    });
    return orderWithSuppliers;
  }
  async countOrder() {
    const orders = async () => {
      try {
        const count = await this.prisma.order.count();
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
  
    return orders();
  }
async countOrderByStatus(status: string,userId:number): Promise<number> {
    const orders = async () => {
      try {
        const count = await this.prisma.order.count({
          where:{
            status:status,
            customerId:userId
          }
        });
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
    return orders();
  }
  async countOAllrderByStatus(status: string): Promise<number> {
    const orders = async () => {
      try {
        const count = await this.prisma.order.count({
          where:{
            status:status,
          }
        });
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
    return orders();
  }
}
