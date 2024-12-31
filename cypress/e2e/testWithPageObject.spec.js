import { navigateTo } from '../support/page_objects/NavigationPage';
import { onFormLayoutsPage } from '../support/page_objects/FormLayoutsPage';
import { onDatepickerPage } from '../support/page_objects/DatepickerPage';
import { onSmartTablePage } from '../support/page_objects/SmartTablePage';

describe('Test with Page Object', () => {
  beforeEach('open application', () => {
    cy.visit('/');
  });

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Evchen Goldstein', 'lucky@gmail.com');
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('lucky@gmail.com', 'Happy4ever')
    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectDatePickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName('Evchen', 'Goldstein');
    onSmartTablePage.updateAgeByFirstName('Evchen', '25');
    onSmartTablePage.deleteRawByIndex(1);
  });

});
