class Template14 extends PDFGenerator {

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
            size: 10,
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'normal',
            size: 10,
            color: this.textColor
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
            leftRatio: 1,
            rightRatio: 0,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {
                    center: true
                });
                left.advance(40);
                pdf.name(left, this.cvInfo.name, {
                    style:this.nameTextStyle().clone({color:this.mainColor}),
                    center: true,
                });
                pdf.title(left, this.cvInfo.title.toUpperCase(), {
                    center: true,
                });
                pdf.drawLineBlock(left, {
                    color: this.mainColor
                });
                pdf.contactInfoBlock(left, {
                    style: "column",
                    uppercase: true,
                    center: true,
                    icon: this.contactImage,
                });
                pdf.drawLineBlock(left, {
                    color: this.mainColor
                });
                pdf.introductionBlock(left, {
                    center: true,
                    uppercase: true,
                });
                pdf.workExpBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.workExpImage,
                    linePadding:20,
                });
                pdf.educationBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.educationImage,
                    linePadding:20,
                });
                pdf.skillsBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.skillImage,
                    linePadding:20,
                });
                pdf.referencesBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.referenceImage,
                    linePadding:20,
                });
                pdf.awardsBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.awardImage,
                    linePadding:20,
                });
                pdf.hobbyBlock(left, {
                    uppercase: true,
                    center: true,
                    upperline: true,
                    icon: this.hobbyImage,
                    linePadding:20,
                });
            }
        }));
    }
}