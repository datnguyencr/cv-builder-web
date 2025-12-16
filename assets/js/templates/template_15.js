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

    async showAvatar({column="left"}={}) {
        this.avatarBlock(this.cvInfo.avatar, {
            size:150,
            borderSize:2,
            borderColor:[255,255,255],
            column:column,padding:7
        });
    }

     formatTime (monthValue)  {
        if (!monthValue) return '';
            const y = monthValue.split('-')[0];
            return y || '';
        };

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
            marker: showTimeLine? marker : null
        });

        this.writeTextWithMarker(description.text, {
            style: description.style,
            column: column,
            marker: showTimeLine? marker : null
        });
        this.writeTextWithMarker(dates.text, {
            style: dates.style,
            column: column,
            marker: showTimeLine? marker : null
        });
    }
    async showName({column="left"}={}) {
        this.name(this.cvInfo.name, {column:column,
            textSize: 32,
            textColor: this.mainColor,
        });
    }

    async showTitle({column="left"}={}) {
        this.title(this.cvInfo.title, {column:column,
            textColor: this.textColor,uppercase:true
        });
        this.addYOffset(column, 10);
    }

    async showIntroduction({column="left"}={}) {
        this.doc.setLineWidth(1);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin+this.leftWidth, this.rightY, this.pageWidth - this.margin, this.rightY);
        this.addYOffset(column,20);
        await this.introduction(this.cvInfo.introduction, {
            center: false,
            column: column
        });
    }

    async showEducation({column="left"}={}) {
        await this.educationBlock({
            column: column,
            uppercase:true,
            icon:this.educationImage,
        });
    }

    async showWorkExp({column="left"}={}) {
        await this.workExpBlock({
            column: column,
            uppercase:true,
            icon:this.workExpImage,
        });
    }
    async showSkills({column="left"}={}) {
        await this.skillsBlock({ 
            column: column,
            uppercase: true,
            icon:this.skillImage,
        });
    }

    async showAward({column="left"}={}) {
        await this.awardsBlock({ 
            column: column,
            uppercase: true,
            icon:this.awardImage,
        });
    }

    async showReference({column="left"}={}) {
        await this.referencesBlock({ 
            column: column,
            uppercase: true,
            icon:this.referenceImage,
        });
    }

    async showHobby({column="left"}={}) {
        await this.hobbyBlock({ column: column,
            uppercase: true,
            icon:this.hobbyImage,
        });
    }
        async showContactInfo({
        column = "left"
    } = {}) {
        await this.contactInfoBlock({
            column:column,
            style:"row",
            icon:this.contactImage
        });
    }
    async showLeftColumn({column="left"}={}) {
        await this.showAvatar({column:column});
        await this.showContactInfo({column:column});
        await this.showSkills({column:column});
        await this.showReference({column:column});
    }

    async showRightColumn({column="right"}={}) {
        this.addYOffset(column,30);
        await this.showName({column:column});
        await this.showTitle({column:column});
        await this.showIntroduction({column:column});
        this.doc.setLineWidth(1);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin+this.leftWidth, this.rightY, this.pageWidth - this.margin, this.rightY);
        this.addYOffset(column,10);
        await this.showAward({column:column});
        await this.showHobby({column:column});
        await this.showWorkExp({column:column});
        await this.showEducation({column:column});
    }
}
