import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from './Dto/notification.dto';
import { NotificationUpdate } from './Dto/update.notification';

@Injectable()
export class NotificationService {
  public pubSub: PubSub;
  private prisma :PrismaClient


  constructor(){
    this.prisma = new PrismaClient();
    this.pubSub = new PubSub();

}
 /* async sendNotification(recipientId: number, message: string, soundUrl: string): Promise<boolean> {
    const recipient = await this.prisma.user.findUnique({ where: { id: recipientId } });

    if (recipient) {
      // Logic for sending the notification (e.g., push notification, WebSocket event, etc.)
      console.log(`Sending notification to recipient: ${recipient.username}`);
      console.log(`Message: ${message}`);
      console.log(`Sound URL: ${soundUrl}`);

      const notification: Notification = {
        recipientId: recipient.id,
        message,
        type,
        soundUrl,
      };

      this.pubSub.publish('notification', { notification });

      return true;
    }

    return false;
  }
*/
  async createNotification(notificationData) {
    try {
      const notification = await this.prisma.notification.create({
        data: notificationData,
      });
      return notification;
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  async getNotificationById(notificationId) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });
      return notification;
    } catch (error) {
      throw new Error(`Failed to retrieve notification: ${error.message}`);
    }
  }
  async countNotifications() {
    const orders = async () => {
      try {
        const count = await this.prisma.notification.count({
          where:{
            status:"new"
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
  async getAllNotifications() {
    try {
      const notifications = await this.prisma.notification.findMany();
      return notifications;
    } catch (error) {
      throw new Error(`Failed to retrieve notifications: ${error.message}`);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const notification = await this.prisma.notification.delete({
        where: { id: notificationId },
      });
      return notification;
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }
  async  updateotification(id: number): Promise<NotificationUpdate> {
    const updateNotification = await this.prisma.notification.update({
      where: { id },
      data: { status :"seen" },
    });

  
    return updateNotification;
  }
}