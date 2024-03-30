import express from "express";

import { getParticipantsList } from "#ctrlParticipation/getParticipantsList.js";

const routerRace = express.Router();

routerRace.get("/race", getParticipantsList);

export default routerRace;
