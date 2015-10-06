var patientPage = function() {
    var name = element(by.model('user.name'));
    var engName = element(by.model('user.engName'));
    var birthDay = element(by.model('user.birthDay'));
    var entryDate = element(by.model('user.entryDate'));
    var gender  = element(by.model('user.gender')).all(by.tagName('md-radio-button'));
    var nationality = element(by.model('user.nationality'));
    var mdOption = element(by.css('md-option'));
    var job = element(by.model('user.job'));
    var postCode = element(by.model('user.postCode'));
    var address = element(by.model('user.address'));
    var addressDetail = element(by.model('user.addressDetail'));
    var saveBtn = element(by.buttonText('저장'));
    var receiptGoBtn = element(by.buttonText('접수화면'));

    this.go = function(url) {
        if(url == undefined) {
            browser.get('#/pc');
            return;
        }
        browser.get(url);
    };

    this.setName = function(pName) {
        name.sendKeys(pName);
        return this;
    };
    this.setEngName = function(pEngName) {
        engName.sendKeys(pEngName);
        return this;
    };
    this.setBirthDay = function(pBirthDay) {
        birthDay.sendKeys(pBirthDay);
        return this;
    };
    this.setEntryDate = function(pEntryDate) {
        entryDate.sendKeys(pEntryDate);
        return this;
    };
    this.setGender = function(idx) {
        gender.get(idx).click();
        return this;
    };
    this.setNationality = function() {
        nationality.click();
        mdOption.click();
        return this;
    };
    this.setJob = function() {
        job.click();
        mdOption.click();
        return this;
    };
    this.setPostCode = function(pPostCode) {
        postCode.sendKeys(pPostCode);
        return this;
    };
    this.setAddress = function(pAddress) {
        address.sendKeys(pAddress);
        return this;
    };
    this.setAddressDetail = function(pAddressDetail) {
        addressDetail.sendKeys(pAddressDetail);
        return this;
    };
    this.save = function() {
        saveBtn.click();
        receiptGoBtn.click();
    };
    this.ramdomSave = function() {
        name.sendKeys('홍길동');
        engName.sendKeys('Hong Gil dong');

        // nation
        nationality.click();
        mdOption.click();

        // job
        job.click();
        mdOption.click();

        gender.get(0).click();

        birthDay.sendKeys('2015/09/21');
        entryDate.sendKeys('2015/09/21');

    };




};

module.exports = patientPage;