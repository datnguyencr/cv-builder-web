import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template15 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [229, 229, 229],
            mainColor: [0, 0, 0],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
            size: 10,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        size: 140,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(20);

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                    pdf.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    pdf.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
