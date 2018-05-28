import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effects';
import { UserEffects } from './user.effects';
import { StudentEffects } from './student.effects';
import { SchoolEffects } from './school.effects';
import { DiplomaEffects } from './diploma.effects';
import { UserDiplomaEffects } from './userDiploma.effects';
import { DistrictEffects } from './district.effects';
import { CampusEffects } from './campus.effects';
import { SpotEffects } from './spot.effects';
import { CategoryEffects } from './category.effects';
import { SubjectEffects } from './subject.effects';
import { ProductEffects } from './product.effects';
import { CouponEffects } from './coupon.effects';
import { ServiceEffects } from './service.effects';
import { OrderEffects } from './order.effects';
import { PageEffects } from './page.effects';
import { ReceiptEffects } from './receipt.effects';
import { MenuEffects } from './menu.effects';
import {PostEffects} from './post.effects';
import {RoleEffects} from './role.effects';
import {CompensationEffects} from './compensation.effects';
import {OrderDetailEffects} from './order-detail.effects';
import {ClassEffects} from './class.effects';
export const effects = {
    auth: AuthEffects,
    quote: QuoteEffects,
    user:UserEffects,
    student:StudentEffects,
    school:SchoolEffects,
    diploma:DiplomaEffects,
    userDiploma:UserDiplomaEffects,
    district:DistrictEffects,
    campus:CampusEffects,
    spot:SpotEffects,
    category:CategoryEffects,
    subject:SubjectEffects,
    product:ProductEffects,
    coupon:CouponEffects,
    service:ServiceEffects,
    order:OrderEffects,
    page:PageEffects,
    receipt:ReceiptEffects,
    menu:MenuEffects,
    post:PostEffects,
    role:RoleEffects,
    compensation:CompensationEffects,
    orderdetail:OrderDetailEffects,
    clas:ClassEffects
  };
@NgModule({
    imports: [
        EffectsModule.run(effects.auth),
        EffectsModule.run(effects.quote),
        EffectsModule.run(effects.user),
        EffectsModule.run(effects.student),
        EffectsModule.run(effects.school),
        EffectsModule.run(effects.diploma),
        EffectsModule.run(effects.userDiploma),
        EffectsModule.run(effects.district),
        EffectsModule.run(effects.campus),
        EffectsModule.run(effects.spot),
        EffectsModule.run(effects.category),
        EffectsModule.run(effects.subject),
        EffectsModule.run(effects.product),
        EffectsModule.run(effects.coupon),
        EffectsModule.run(effects.order),
        EffectsModule.run(effects.page),
        EffectsModule.run(effects.receipt),
        EffectsModule.run(effects.service),
        EffectsModule.run(effects.menu),
        EffectsModule.run(effects.post),
        EffectsModule.run(effects.role),
        EffectsModule.run(effects.compensation),
        EffectsModule.run(effects.orderdetail),
        EffectsModule.run(effects.clas)
        ]
})
export class AppEffectsModule {}