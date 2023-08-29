Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, path: '', path_names: {
    sign_in: 'api/login',
    sign_out: 'api/logout',
    registration: 'api/signup'
  }

  namespace :api do
    post 'sign_up', to: 'auth#sign_up'
    post 'sign_in', to: 'auth#sign_in'
    resources :articles
  end

end

