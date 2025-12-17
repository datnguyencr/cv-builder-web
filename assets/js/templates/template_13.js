class Template13 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [211, 204, 247],
        mainColor: [0, 0, 0]
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Afacad-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Afacad-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Afacad-Italic.ttf', 'custom', 'italic');
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
            style: 'normal',
            size: 10,
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'italic',
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
            ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextPair(
            ctx, description.text.toUpperCase(), dates.text.toUpperCase(), {
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
            leftRatio: .4,
            rightRatio: .6,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {
                    center: true,
                    borderSize: 10,
                    borderColor: this.rightBackgroundColor,
                });
                left.advance(40);

                pdf.contactInfoBlock(left, {
                    headerColor: this.textColor,
                    icon: this.contactImage,
                    underline: true,
                    uppercase: true,
                });
                pdf.skillsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.skillImage,
                    underline: true,
                    uppercase: true,
                });
                pdf.referencesBlock(left, {
                    headerColor: this.textColor,
                    icon: this.referenceImage,
                    underline: true,
                    uppercase: true,
                });
                pdf.awardsBlock(left, {
                    headerColor: this.textColor,
                    icon: this.awardImage,
                    underline: true,
                    uppercase: true,
    
                });
                pdf.hobbyBlock(left, {
                    headerColor: this.textColor,
                    icon: this.hobbyImage,
                    underline: true,
                    uppercase: true,
    
                });
                right.advance(40);
                pdf.name(right, this.cvInfo.name, {
                    style:this.nameTextStyle().clone({color:this.mainColor,size:48}),
                    textSize: 48,
                });
                pdf.title(right, this.cvInfo.title, {
                    style:this.titleTextStyle().clone({size:24}),
                    uppercase: true,
                });
                pdf.introductionBlock(right, {
                    headerColor: this.textColor,
                    icon: this.introductionImage,
                    underline: true,
                    uppercase: true,
                });
                pdf.workExpBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,
                    underline: true,
                    uppercase: true,
                    showTimeLine: true,
                });
                pdf.educationBlock(right, {
                    headerColor: this.textColor,
                    icon: this.educationImage,
                    underline: true,
                    uppercase: true,
                    showTimeLine: true,
                });
            }
        }));
    }
}