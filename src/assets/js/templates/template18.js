import {
    TimeFormat,
    FontStyle,
    AvatarShape,
    SkillListType,
    ContactInfoType,
} from "../model.js";
import { BaseTemplate, Section, TIMELINE_MARKERS } from "./base_template.js";
export class Template18 extends BaseTemplate {
    constructor(
        cvInfo,
        options = {
            mainColor: [183, 31, 28],
            headerTextStyle: FontStyle.NORMAL,
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
            style: FontStyle.NORMAL,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            size: 14,
            color: this.textColor,
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
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
