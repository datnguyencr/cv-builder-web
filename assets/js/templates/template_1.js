class Template1 extends PDFGenerator {

    constructor(cvInfo, options = {}) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    showName(){
        this.name(this.cvInfo.name,{center:true});
    }

    showTitle(){
        this.title(this.cvInfo.title,{center:true});
    }
    showIntroduction(){
        // Horizontal line
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        this.leftY += 20;
        this.section({ text: "Introduction", uppercase: true, center: true });
        this.introduction(this.cvInfo.introduction, { style: 'italic' ,center: true});
    }
    showEducation(){
        this.educationBlock({uppercase:true});
    }

    showWorkExp(){
        this.workExpBlock({uppercase:true});
    }

    showSkills(){
        this.skillsBlock({uppercase:true});
    }
    
    showAward(){
        this.awardsBlock({uppercase:true});
    }

    showReference(){
        this.referencesBlock({uppercase:true});
    }

    showHobby(){
        this.hobbyBlock({uppercase:true});
    }
}
