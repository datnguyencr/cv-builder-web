import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template28 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            mainColor: [46, 160, 166],
            headerTextSize: 16,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
            normalFont: "AlbertSans-Regular.ttf",
            boldFont: "AlbertSans-Bold.ttf",
            italicFont: "AlbertSans-Italic.ttf",
            //skillListType: SkillListType.LIST,
            contactBackgroundColor: [27, 32, 41],
            headerLineCustomWidth: 150,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
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
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 190, "F");
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
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                        lineThickness: 2,
                    });
                    left.advance(10);
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                        lineThickness: 2,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                        lineThickness: 2,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                },
            })
        );
    }
}
