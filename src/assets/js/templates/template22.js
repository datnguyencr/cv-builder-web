import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template22 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            mainColor: [20, 95, 150],
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 110,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            size: 16,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.mainColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.mainColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
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
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
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
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left, {
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}
