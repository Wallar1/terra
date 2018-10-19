require 'test_helper'

class FakemodelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fakemodel = fakemodels(:one)
  end

  test "should get index" do
    get fakemodels_url
    assert_response :success
  end

  test "should get new" do
    get new_fakemodel_url
    assert_response :success
  end

  test "should create fakemodel" do
    assert_difference('Fakemodel.count') do
      post fakemodels_url, params: { fakemodel: {  } }
    end

    assert_redirected_to fakemodel_url(Fakemodel.last)
  end

  test "should show fakemodel" do
    get fakemodel_url(@fakemodel)
    assert_response :success
  end

  test "should get edit" do
    get edit_fakemodel_url(@fakemodel)
    assert_response :success
  end

  test "should update fakemodel" do
    patch fakemodel_url(@fakemodel), params: { fakemodel: {  } }
    assert_redirected_to fakemodel_url(@fakemodel)
  end

  test "should destroy fakemodel" do
    assert_difference('Fakemodel.count', -1) do
      delete fakemodel_url(@fakemodel)
    end

    assert_redirected_to fakemodels_url
  end
end
