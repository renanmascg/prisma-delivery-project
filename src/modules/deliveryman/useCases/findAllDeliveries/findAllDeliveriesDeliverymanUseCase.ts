import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        username: true,
        id: true,
        deliveries: {
          select: {
            id: true,
            item_name: true,
            created_at: true,
            end_at: true,
          }
        },
      },
    });

    return deliveries;
  }
}