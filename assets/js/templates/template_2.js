class Template2 extends PDFGenerator {


    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
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
            style: 'bold',
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'normal',
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
            ctx,
            `${title.text} | ${description.text}`, {
                style: title.style,lineHeight:0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextWithMarker(
            ctx,
            dates.text, {
                style: dates.style,lineHeight:0,
                marker: showTimeLine ?
                    (x, y, w, pdf) => {
                        pdf.doc.line(
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
            leftRatio: 0.2,
            rightRatio: 0.8,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left,this.cvInfo.avatar, {
                    size: 90
                });
                right.advance(40);
                pdf.name(right, this.cvInfo.name, {
                    textColor: this.textColor
                });
                pdf.title(right, this.cvInfo.title, {
                    textColor: this.textColor
                });
            }
        }));

        this.renderSection(new Section({
            leftRatio: .6,
            rightRatio: .4,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.introductionBlock(left, {
                    headerColor: this.textColor,
                    icon: this.introductionImage,
                });
                pdf.contactInfoBlock(right, {
                    headerColor: this.textColor,
                    icon: this.contactImage,
                });
            }
        }));
        this.renderSection(new Section({
            leftRatio: .4,
            rightRatio: .6,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.skillsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.skillImage,
                });
                pdf.referencesBlock(left, {
                    headerColor: this.textColor,
                    icon: this.referenceImage,
                });
                pdf.awardsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.awardImage,
                });
                pdf.hobbyBlock(left, {
                    headerColor: this.textColor,
                    icon: this.hobbyImage,
                });
                pdf.workExpBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,
                    showTimeLine: true
                });
                pdf.educationBlock(right, {
                    headerColor: this.textColor,
                    icon: this.educationImage,
                    showTimeLine: true
                });
            }
        }));
    }
}