import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/createDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/createDeliverymanController";

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();


const routes = Router();

routes.post("/client/authenticate/", authenticateClientController.handle);
routes.post("/deliveryman/authenticate/", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

export { routes }