import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template7 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [2, 55, 78],
            mainColor: [2, 55, 78],
            textColor: [0, 0, 0],
            headerTextSize: 18,
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
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
            this.writeTextWithMarker(ctx, `( ${dates.text} )`, {
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
                        borderSize: 7,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(20);
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(20);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.workExpImage,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.educationImage,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}
