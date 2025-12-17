class Template15 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [229, 229, 229],
        mainColor: [0, 0, 0]
    }) {
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
            style: 'bold',
            color: this.textColor
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'normal',size:10,
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'italic',size:10,
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
        ctx.advance(this.writeTextWithMarker(
            ctx, description.text, {
                style: description.style,
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
        ctx.advance(this.writeTextWithMarker(
            ctx, dates.text, {
                style: dates.style,
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
            leftRatio: .4,
            rightRatio: .6,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {
                    center: true,
                    size: 140,
                    borderSize: 10,
                    borderColor: this.rightBackgroundColor,
                });
                left.advance(20);

                pdf.contactInfoBlock(left, {
                    headerColor: this.textColor,
                    icon: this.contactImage,
                    uppercase: true,
                });
                pdf.skillsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.skillImage,
                    uppercase: true,
                });
                pdf.referencesBlock(left, {
                    headerColor: this.textColor,
                    icon: this.referenceImage,
                    uppercase: true,
                });
                pdf.awardsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.awardImage,
                    uppercase: true,
                });
                pdf.hobbyBlock(left, {
                    headerColor: this.textColor,
                    icon: this.hobbyImage,
                    uppercase: true,
                });
                right.advance(20);
                pdf.name(right, this.cvInfo.name, {
                    textColor: this.mainColor
                });
                pdf.title(right, this.cvInfo.title, {
                    textColor: this.textColor
                });
                pdf.drawLineBlock(right, {
                    color: this.mainColor
                });
                pdf.introductionBlock(right, {
                    headerColor: this.textColor,
                    icon: this.introductionImage,
                    uppercase: true,
                });
                pdf.drawLineBlock(right, {
                    color: this.mainColor
                });
                pdf.workExpBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,
                    uppercase: true,
                });
                pdf.educationBlock(right, {
                    headerColor: this.textColor,
                    icon: this.educationImage,
                    uppercase:true,
                });
            }
        }));
    }
}
