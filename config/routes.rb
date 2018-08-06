Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'welcome/index'
  get 'welcome/render_itinerary'
  root 'welcome#index'

  resources :sites
  resources :bill_analyses
  resources :designs
  resources :proposals
  resources :final_contracts
  resources :messages
end
