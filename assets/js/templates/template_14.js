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
    blockHeader({
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        column = "left",
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {

        const marker = TIMELINE_MARKERS["circle"];
        this.doc.setFillColor(...timelineColor);
        this.writeTextWithMarker(title.text, {
            style: title.style,
            column: column,
            marker: showTimeLine?marker:null
        });

        const colW =  (this.colWidth(column) - this.margin * 2);
        const textW = colW - 10 - 10;
        var leftRatio=0.6;
        const desciptionLines=this.doc.splitTextToSize(description.text, textW*leftRatio);
        const datesLines=this.doc.splitTextToSize(dates.text, textW*(1-leftRatio));

        const lines = Math.max(desciptionLines.length,datesLines.length);
        this.row(
                (opts) => this.writeTextWithMarker(description.text, {
                    ...opts,
                    style: description.style,
                    column,
                    marker: showTimeLine
                        ? (x, y, w, ctx) => ctx.doc.line(x, y - w * 2, x, y + (w+20) *lines)
                        : null
                }),
                (opts) => this.writeTextWithMarker(dates.text, {
                    ...opts,
                    style: dates.style,
                    column,
                    marker: null,
                    align: "right"
                }),
                {
                    column,
                    leftRatio: leftRatio
                }
            );
            this.addYOffset(column,10);
    }
    async showName({column="left"}={}) {
        this.name(this.cvInfo.name, {column:column,
            center: true
        });
    }

    async showTitle({column="left"}={}) {
        this.title(this.cvInfo.title, {column:column,
            center: true
        });
    }
    async showContactInfo({column="left"}={}) {
        this.doc.setLineWidth(1);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        await this.contactInfo();
        this.addYOffset(column,10);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        this.addYOffset(column,20);
    }

    async showIntroduction({column="left"}={}) {
        this.section({
            text: "Introduction",column:column,
            uppercase: true,
            center: true
        });
        this.introduction(this.cvInfo.introduction, {
            style: 'italic',
            center: true
        });
        this.addYOffset(column,20);
    }
    async showEducation({column="left"}={}) {
        this.educationBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

    async showWorkExp({column="left"}={}) {
        await this.workExpBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

    async showSkills({column="left"}={}) {
        await this.skillsBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

    async showAward({column="left"}={}) {
        await this.awardsBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

    async showReference({column="left"}={}) {
        await this.referencesBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

    async showHobby({column="left"}={}) {
        await this.hobbyBlock({
            uppercase: true,column:column,
            center: true,upperline:true
        });
    }

        async showLeftColumn({column="left"}={}) {
        await this.showAvatar({column:column});
        await this.showName({column:column});
        await this.showTitle({column:column});       
        await this.showContactInfo({column:column});
        await this.showIntroduction({column:column});
        await this.showWorkExp({column:column});
        await this.showEducation({column:column});
        await this.showSkills({column:column});
        await this.showReference({column:column});
        await this.showAward({column:column})
        await this.showHobby({column:column});
    }
}