class Template5 extends PDFGenerator {


    constructor(cvInfo, options = {
        mainColor: [229, 211, 194], 
        leftRatio: .4,
        rightRatio: .6,
        headerTextSize: 16,
        separator:true,
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/AdventPro-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/AdventPro-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/AdventPro-Italic.ttf', 'custom', 'italic');
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
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextWithMarker(
            ctx,
            dates.text, {
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
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 150,"F");
        this.renderSection(new Section({
            leftRatio: 0.25,
            rightRatio: 0.75,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {size:100});
                right.advance(50);
                pdf.name(right, this.cvInfo.name.toUpperCase(), {});
                pdf.title(right, this.cvInfo.title.toUpperCase(), {});
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
                pdf.contactInfoBlock(left, {
                    headerColor: this.textColor,
                    icon: this.contactImage,uppercase:true,
                });
                pdf.skillsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.skillImage,uppercase:true,
                });
                pdf.referencesBlock(left, {
                    headerColor: this.textColor,
                    icon: this.referenceImage,uppercase:true,
                });
                pdf.awardsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.awardImage,uppercase:true,
                });
                pdf.hobbyBlock(left, {
                    headerColor: this.textColor,
                    icon: this.hobbyImage,uppercase:true,
                });
                right.advance(10);
                pdf.introductionBlock(right, {
                    headerColor: this.textColor,
                    icon: this.introductionImage,uppercase:true,
                });
                this.drawLineBlock(right,{color:this.mainColor});
                pdf.workExpBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,uppercase:true,
                });
                pdf.educationBlock(right, {
                    headerColor: this.textColor,
                    icon: this.educationImage,uppercase:true,
                });
            }
        }));
    }
}