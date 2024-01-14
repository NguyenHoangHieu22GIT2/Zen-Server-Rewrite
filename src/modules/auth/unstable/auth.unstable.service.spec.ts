import { Test } from "@nestjs/testing"
import { AuthServiceUnstable } from "./auth.unstable.service"
import { AuthServiceStable } from "../stable/auth.stable.service"

it("can create a service",async()=>{
    const fakeAuthServiceStable = {

    }
    const module = await Test.createTestingModule({
        providers:[AuthServiceUnstable,{provide:AuthServiceStable,useValue:fakeAuthServiceStable}]
    }).compile();

    const service = module.get(AuthServiceUnstable);
    expect(service).toBeDefined();

})