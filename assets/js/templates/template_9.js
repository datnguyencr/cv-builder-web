class Template9 extends PDFGenerator {

    constructor(cvInfo, options = {leftRatio:.45, rightRatio:.55, leftBackgroundColor:[211, 204, 247]}) {
        super(cvInfo, options);
        this.margin = 20;
        this.rightY = this.margin;
        this.colHeight =  this.pageHeight -  this.margin * 2;
    }

    showName(){
        this.name(this.cvInfo.name);
    }

    showTitle(){
        this.title(this.cvInfo.title);
    }

    showContactInfo(){
        let column="left";
        let center=false;
        this.addYOffset(column,5);
        this.writeText("Phone: "+this.cvInfo.phone, { center: center ,column:column});
        this.writeText("Email: "+this.cvInfo.email, { center: center ,column:column});
        this.writeText("Links: "+this.cvInfo.url, { center: center ,column:column});
        this.addYOffset(column,5)
    }

    showIntroduction(){
        this.section({ text: "Introduction", uppercase: true,column:"right"});
        this.introduction(this.cvInfo.introduction,{center: false,column : "right" });
    }

    showEducation(){
        this.educationBlock("right");
    }

    showWorkExp(){
        this.workExpBlock("right");
    }
}
