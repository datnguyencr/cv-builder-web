class Template4 extends PDFGenerator {

    constructor(cvInfo, options = {
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
    contactLabelTextStyle(){
        return new TextStyle({color:this.textColor,style:"bold"});
    }
    contactValueTextStyle(){
        return new TextStyle({color:this.textColor,style:"normal"});
    }
    async showContactInfo({
        column = "left"
    } = {}) {
        await this.contactInfoBlock({
            column:column,
            style:"row",
            icon:this.contactImage});
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
            marker: showTimeLine ? marker : null
        });

        const colW = this.colWidth(column);
        const textW = colW - 10 - 10;
        var leftRatio = 0.6;
        const desciptionLines = this.doc.splitTextToSize(description.text, textW * leftRatio);
        const datesLines = this.doc.splitTextToSize(dates.text, textW * (1 - leftRatio));

        const lines = Math.max(desciptionLines.length, datesLines.length);
        this.row(
            (opts) => this.writeTextWithMarker(description.text, {
                ...opts,
                style: description.style,
                column,
                marker: showTimeLine ?
                    (x, y, w, ctx) => ctx.doc.line(x, y - w * 2, x, y + (w + 20) * lines) :
                    null
            }),
            (opts) => this.writeTextWithMarker(dates.text, {
                ...opts,
                style: dates.style,
                column,
                marker: null,
                align: "right"
            }), {
                column,
                leftRatio: leftRatio
            }
        );
        this.addYOffset(column, 10);
    }

    async showName() {
        this.name(this.cvInfo.name, {});
    }

    async showTitle() {
        this.title(this.cvInfo.title, {});
    }

    async showIntroduction({
        column = "left"
    } = {}) {
        this.introductionBlock({
            column: column,
            headerColor:this.textColor,
        });
    }
    
    async showEducation() {
        this.educationBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.educationImage
        });
    }

    async showWorkExp() {
        await this.workExpBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.workExpImage
        });
    }

    async showSkills() {
        await this.skillsBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.skillImage
        });
    }

    async showAward() {
        await this.awardsBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.awardImage
        });
    }

    async showReference() {
        await this.referencesBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.referenceImage
        });
    }

    async showHobby() {
        await this.hobbyBlock({
            upperline: true,
            headerColor: this.textColor,
            dash: true,icon: this.hobbyImage
        });
    }
async showLeftColumn({
        column = "left"
    } = {}) {
        await this.showAvatar({
            column: column
        });
        await this.showName({
            column: column
        });
        await this.showTitle({
            column: column
        });
        await this.showIntroduction({
            column: column
        });
        await this.showContactInfo({
            column: column
        });
        await this.showSkills({
            column: column
        });
        await this.showReference({
            column: column
        });
        await this.showAward({
            column: column
        });
        await this.showHobby({
            column: column
        });
        await this.showWorkExp({
            column: column
        });
        await this.showEducation({
            column: column
        });
    }
    async showTopContent() {

    }
}