import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template24 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [20, 95, 150],
            mainColor: [20, 95, 150],
            textColor: [0, 0, 0],
            headerTextSize: 18,
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
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
                              timeLineColor: timeLineColor,
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
                        borderSize: 5,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name.toUpperCase(), {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title, {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.rightBackgroundColor,
                        marginHorizontal: 40,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });

                    right.advance(20);
                    pdf.introductionBlock(right, {
                        uppercase: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        uppercase: true,

                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(right, {
                        uppercase: true,

                        icon: this.educationImage,
                    });
                },
            })
        );
    }
}
