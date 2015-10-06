describe('환자 CRUD', function() {

    var PatientPage = require('../../objects/patient/patientPage.js');

    it('환자 등록', function() {
        var patientPage = new PatientPage();

        patientPage.go();

        patientPage
            .setName('홍길동')
            .setEngName('Hong Gil dong')
            .setBirthDay('1985/01/22')
            .setEntryDate('2015/09/12')
            .setGender(1)
            .setNationality()
            .setJob()
            .setPostCode('07946')
            .setAddress('서울 양천구 공항대로 530 (목동)')
            .setAddressDetail('공항아파트')
            .save();

        expect(browser.getCurrentUrl()).toContain('#/pr');

    });

});
