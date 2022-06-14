import { Product } from './../../interfaces/product.type';
import { ProductService } from './../../services/product.service';
import { Component, Injectable, OnInit } from "@angular/core";
import { DashboardItem } from "../../interfaces/dashboard.item.type";
import { DashboardService } from "../../services/dashboard.service";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class DashboardComponent implements OnInit {
  public elements: DashboardItem[] = [];
  public loading = false;
  public ngxLoadingAnimationTypes = {
    chasingDots: "chasing-dots",
    circle: "sk-circle",
    circleSwish: "circleSwish",
    cubeGrid: "sk-cube-grid",
    doubleBounce: "double-bounce",
    none: "none",
    pulse: "pulse",
    rectangleBounce: "rectangle-bounce",
    rotatingPlane: "rotating-plane",
    threeBounce: "three-bounce",
    wanderingCubes: "wandering-cubes",
  };

  constructor(
    private dashboardService: DashboardService,
    private toast: ToastService,
    private productService: ProductService
  ) {}

  public productsData: Product[] = [];
  public productDashboardItem : DashboardItem = {
    campaignTitle: "",
    campaignType: "",
    impactedUsers: 0,
    creationDate: new Date(),
    sendDate: new Date(),
    status: "",
    theme: "",
    themeIcon: "",
    color: "",
    expandableData: [
      {
        icon: "",
        value: "",
        label: "",
      },
    ],
  }

  public ngOnInit() {
    this.getData().then();
    this.productService.getProducts().subscribe((data) => {
      this.productsData = data;
      this.productDashboardItem = this.newDashboardItem();
    });
  }

  mostExpensiveProduct(): Product {
    return this.productsData.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }, this.productsData[0]);
  }

  leastExpensiveProduct(): Product {
    return this.productsData.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }, this.productsData[0]);
  }

  averagePrice(): number {
    return (
      this.productsData.reduce((prev, curr) => {
        return prev + curr.price;
      }, 0) / this.productsData.length
    );
  }

  totalPrice(): number {
    return this.productsData.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
  }

  totalProducts(): number {
    return this.productsData.length;
  }

  newDashboardItem(): DashboardItem {
    return {
      campaignTitle: "Productos",
      campaignType: "Promoción",
      impactedUsers: 10,
      creationDate: new Date(),
      sendDate: new Date(),
      status: "Creada",
      theme: "Compras",
      themeIcon: "otros@PYPGrandes",
      color: "#e41c77",
      expandableData: [
        {
          icon: "",
          value: this.mostExpensiveProduct().title,
          label: "Producto mas caro",
        },
        {
          icon: "",
          value: this.leastExpensiveProduct().title,
          label: "Producto mas barato",
        },
        {
          icon: "",
          value: this.averagePrice().toString(),
          label: "Precio promedio",
        },
        {
          icon: "",
          value: this.totalPrice().toString(),
          label: "Precio total",
        },
        {
          icon: "",
          value: this.totalProducts().toString(),
          label: "Total de productos",
        },
      ],
    };
  }

  /**
   * getMetrics
   */
  public async getData() {
    try {
      this.loading = true;
      this.elements = await this.dashboardService.getNewDashboardData();
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.toast.error(
        "No se pudieron obtener los indicadores del dashboard, revise su conexión"
      );
    }
  }
}
