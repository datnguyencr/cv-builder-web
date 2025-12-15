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
    async showName() {
        this.name(this.cvInfo.name, {
            center: true
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {
            center: true
        });
    }
    async showContactInfo() {
        this.doc.setLineWidth(1);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        await this.contactInfo();
        this.addYOffset("left",10);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        this.addYOffset("left",20);
    }

    async showIntroduction() {
        this.section({
            text: "Introduction",
            uppercase: true,
            center: true
        });
        this.introduction(this.cvInfo.introduction, {
            style: 'italic',
            center: true
        });
        this.addYOffset("left",20);
    }
    async showEducation() {
        this.educationBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

    async showWorkExp() {
        await this.workExpBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

    async showSkills() {
        await this.skillsBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

    async showAward() {
        await this.awardsBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

    async showReference() {
        await this.referencesBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

    async showHobby() {
        await this.hobbyBlock({
            uppercase: true,
            center: true,upperline:true
        });
    }

        async showLeftColumn() {
        await this.showAvatar();
        await this.showName();
        await this.showTitle();       
        await this.showContactInfo();
        await this.showIntroduction();
        await this.showWorkExp();
        await this.showEducation();
        await this.showSkills();
        await this.showReference();
        await this.showAward();
        await this.showHobby();
    }
}