import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template17 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            mainColor: [241, 244, 250],
            headerTextStyle: FontStyle.NORMAL,
            markerFill: false,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
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
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
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
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    this.doc.setFillColor(...this.mainColor);
                    this.doc.rect(0, 0, this.pageWidth, 170, "F");
                    pdf.avatar(left, this.cvInfo.avatar);
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                    right.advance(10);
                    pdf.contactInfoBlock(right, {
                        icon: this.contactImage,
                        header: false,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
