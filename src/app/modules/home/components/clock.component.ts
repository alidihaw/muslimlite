import { Component, ViewChild, Input, ElementRef, OnDestroy, OnInit, AfterViewInit, PLATFORM_ID, Inject } from "@angular/core";
import { ChangeDetectionStrategy, NgZone } from "@angular/core";

import { tap } from "rxjs/operators";

import { TDate } from "@utils/TDate";
import { Subscription, timer } from "rxjs";
import { CommonModule, DOCUMENT, isPlatformBrowser } from "@angular/common";

@Component({
  selector: "cs-canvas-clock",
  standalone: true,
  imports: [CommonModule],
  template: "<canvas #canvas></canvas>",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasClockComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("canvas") canvasRef!: ElementRef;
  @Input() public width = 100;
  @Input() public height = 100;
  canvasContext!: any;
  subscription!: Subscription;

  constructor(private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}
  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    const radius = canvasEl.height / 2;
    const innerRadius = radius * 0.9;
    this.canvasContext = canvasEl.getContext("2d");
    this.canvasContext.translate(radius, radius);

    this.ngZone.runOutsideAngular(() => this.draw(innerRadius));
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription.unsubscribe();
    }
  }

  draw(innerRadius: number) {
    this.subscription = timer(0, 1000)
      .pipe(
        tap(t => {
          this.drawFace(this.canvasContext, innerRadius);
          this.drawNumbers(this.canvasContext, innerRadius);
          this.drawTime(this.canvasContext, innerRadius);
        })
      )
      .subscribe();
  }

  drawFace(ctx: any, radius: any) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    const grad = ctx.createRadialGradient(
      0,
      0,
      radius * 0.95,
      0,
      0,
      radius * 1.05
    );
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  drawNumbers(ctx: any, radius: any) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx: any, radius: any) {
    const { seconds, minutes, hours } = new TDate(new Date());
    const hourHand =
      ((hours % 12) * Math.PI) / 6 +
      (minutes * Math.PI) / (6 * 60) +
      (seconds * Math.PI) / (360 * 60);
    this.drawHand(ctx, hourHand, radius * 0.5, radius * 0.07);

    const minuteHand =
      (minutes * Math.PI) / 30 + (seconds * Math.PI) / (30 * 60);
    this.drawHand(ctx, minuteHand, radius * 0.8, radius * 0.07);

    const secondHand = (seconds * Math.PI) / 30;
    this.drawHand(ctx, secondHand, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx: any, pos: any, length: any, width: any) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
