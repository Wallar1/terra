require "application_system_test_case"

class FakemodelsTest < ApplicationSystemTestCase
  setup do
    @fakemodel = fakemodels(:one)
  end

  test "visiting the index" do
    visit fakemodels_url
    assert_selector "h1", text: "Fakemodels"
  end

  test "creating a Fakemodel" do
    visit fakemodels_url
    click_on "New Fakemodel"

    click_on "Create Fakemodel"

    assert_text "Fakemodel was successfully created"
    click_on "Back"
  end

  test "updating a Fakemodel" do
    visit fakemodels_url
    click_on "Edit", match: :first

    click_on "Update Fakemodel"

    assert_text "Fakemodel was successfully updated"
    click_on "Back"
  end

  test "destroying a Fakemodel" do
    visit fakemodels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Fakemodel was successfully destroyed"
  end
end
