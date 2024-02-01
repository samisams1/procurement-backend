import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './Dto/notification.dto';
import { NotificationUpdate } from './Dto/update.notification';
import { NotificationInput } from './Dto/createNotificationInput';


@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Boolean)
 /* async sendNotification(
    @Args('recipientId') recipientId: number,
    @Args('message') message: string,
    @Args('soundUrl') soundUrl: string,
  ): Promise<boolean> {
    return this.notificationService.sendNotification(recipientId, message, soundUrl);
  }
*/
  @Subscription(() => Notification)
  notification(): AsyncIterator<Notification> {
    return this.notificationService.pubSub.asyncIterator('notification');
  }

  @Query(()=>[Notification])
    async notitfications() {
      return this.notificationService.getAllNotifications();
}
    @Query(() => Int)
async countNotifications(): Promise<number> {
  const count = await this.notificationService.countNotifications();
  return count;
} 

@Mutation(() => Notification)
  async createNotification(@Args('input') input: NotificationInput) {
    return this.notificationService.createNotification(input);
  }

@Mutation(() => Notification)
async updateNotification(@Args('id') id: number): Promise<NotificationUpdate> {
  try {
    const updateNotification = await this.notificationService.updateotification(id);
    return updateNotification;
  } catch (error) {
    throw new Error('Failed to update notification');
  }
}
}