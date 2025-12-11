class Template9 extends PDFGenerator {

    constructor(cvInfo, options = {leftRatio:.4, rightRatio:.6, leftBackgroundColor:[242, 241, 248],mainColor:[117, 92, 189]}) {
        super(cvInfo, options);
        this.margin = 20;
        this.rightY = this.margin;
        this.colHeight =  this.pageHeight -  this.margin * 2;
    }
    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    showName(){
        this.name(this.cvInfo.name,{textColor:this.mainColor});
    }

    showTitle(){
        this.title(this.cvInfo.title,{textColor:this.textColor});
        this.addYOffset("left",20);
    }

    showContactInfo(){
        let column="left";
        this.section({ text: "Contact"});
        let textSize=this.textSize;
        let lineHeight=15;
        this.writePair({label :"Phone:", value:this.cvInfo.phone, column:column, textSize:textSize, lineHeight:lineHeight});
        this.writePair({label :"Email:", value:this.cvInfo.email, column:column, textSize:textSize, lineHeight:lineHeight});
        this.writePair({label :"Links:", value:this.cvInfo.url, column:column, textSize:textSize, lineHeight:lineHeight});
    }

    showIntroduction(){
        this.section({ text: "Introduction", column:"right"});
        this.introduction(this.cvInfo.introduction,{center: false,column : "right" });
    }

    showEducation(){
        this.educationBlock({column:"right"});
    }

    showWorkExp(){
        this.workExpBlock({column:"right"});
    }

    showLeftColumn(){
        this.showName();
        this.showTitle();
        this.showIntroduction();
        this.showContactInfo();
    }

    showRightColumn(){
        this.showSkills();
        this.showReference();
        this.showAward();
        this.showHobby();
        this.showWorkExp();
        this.showEducation();
    }
}
