class Template29 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            avatarWidth: 90,
            avatarHeight: 90,
            mainColor: [44, 44, 44],
            headerTextStyle: FontStyle.NORMAL,
            markerFill: false,
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
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
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
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        width: 90,
                        height: 90,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, { center: true });
                    pdf.title(left, this.cvInfo.title, { center: true });
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: ContactInfoType.COLUMN,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
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
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                },
            })
        );
    }
}
