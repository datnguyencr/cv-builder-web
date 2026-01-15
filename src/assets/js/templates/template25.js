import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template25 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            mainColor: [50, 123, 172],
            headerTextSize: 16,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.mainColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
        this.contactBackgroundColor = this.mainColor;
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
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
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
            this.writeTextWithMarker(ctx, `${dates.text}`, {
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
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(10);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(10);
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        uppercase: true,
                        header: false,
                        textColor: this.textColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
