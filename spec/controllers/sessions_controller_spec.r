require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'GET #new' do
    it 'renders the login page' do
      get :new
      expect(response).to be_successful
      expect(response).to have_http_header('Content-Type', 'text/html')
      expect(response.body).to include('Login')
    end
  end

  describe 'POST #create' do
    let(:user) { create(:user, password: 'password123') }

    context 'with valid credentials' do
      it 'logs in the user and redirects to root' do
        post :create, params: { 
          email_address: user.email_address, 
          password: 'password123' 
        }
        expect(response).to redirect_to(root_path)
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with invalid credentials' do
      it 'redirects back to login with error' do
        post :create, params: { 
          email_address: user.email_address, 
          password: 'wrong_password' 
        }
        expect(response).to redirect_to(new_session_path)
        expect(flash[:alert]).to be_present
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:user) { create(:user) }

    before do
      sign_in_as user
    end

    it 'logs out the user and redirects to login' do
      delete :destroy
      expect(response).to redirect_to(new_session_path)
      expect(session[:user_id]).to be_nil
    end
  end
end