import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from 'src/app/shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  order?: Order;

  constructor(private orderService:OrderService, private route: ActivatedRoute, private bsService: BreadcrumbService) { }
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order =>{
        this.order = order;
        this.bsService.set('@orderDetailed', 'Order#' + order.id + ' - ' + order.status);
      }
  });
  }





}
