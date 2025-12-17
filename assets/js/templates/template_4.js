class Template4 extends PDFGenerator {

    constructor(cvInfo, options = {}) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }
    blockTitleStyle() {
        return new TextStyle({
            color: this.textColor,
            style: 'bold'
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'normal',
            size: 12,
            color: this.mainColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'normal',
            size: 10,
            color: this.mainColor
        });
    }
    contactLabelTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "bold"
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "normal"
        });
    }
    blockHeader(ctx, {
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {

        const marker = TIMELINE_MARKERS["circle"];

        this.doc.setFillColor(...timelineColor);
        this.doc.setDrawColor(...timelineColor);

        ctx.advance(this.writeTextWithMarker(
            ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextPair(
            ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine ?
                    (x, y, w, pdf) => {
                        this.doc.setLineWidth(1);
                        pdf.drawLine(
                            x,
                            y - w * 2,
                            x,
                            y + w + 5
                        );
                    } : null
            }
        ));
        ctx.advance(20);
    }
    content() {
        this.renderSection(new Section({
            leftRatio: 0.25,
            rightRatio: 0.65,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {size:100});
                right.advance(40);
                pdf.name(right, this.cvInfo.name, {});
                pdf.title(right, this.cvInfo.title, {});
            }
        }));
        this.renderSection(new Section({
            leftRatio: 1,
            rightRatio: 0,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.drawLineBlock(left, {
                    color: this.mainColor
                });
                pdf.introductionBlock(left, {});
                pdf.contactInfoBlock(left, {
                    style: "column",
                    icon: this.contactImage,
                });
                pdf.workExpListBlock(left, {

                    icon: this.workExpImage,
                });
                pdf.educationListBlock(left, {

                    icon: this.educationImage,
                });
                pdf.skillListBlock(left, {

                    icon: this.skillImage,
                });
                pdf.referenceListBlock(left, {

                    icon: this.referenceImage,
                });
                pdf.awardListBlock(left, {

                    icon: this.awardImage,
                });
                pdf.hobbyListBlock(left, {

                    icon: this.hobbyImage,
                });
            }
        }));
    }
}