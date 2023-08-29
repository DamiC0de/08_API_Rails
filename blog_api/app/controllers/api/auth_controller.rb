module Api
    class AuthController < ApplicationController
      # Inscription
      def sign_up
        user = User.new(sign_up_params)
        if user.save
          render json: { status: 'success', message: 'Inscription réussie' }, status: :ok
        else
          render json: { status: 'error', message: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      # Connexion
      def sign_in
        user = User.find_by(email: params[:email])
        
        if user&.valid_password?(params[:password])
          # Génération du JWT
          result = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
          
          # Log pour débugger
          Rails.logger.info "JWT Generation Result: #{result.inspect}"
          
          if result.is_a?(Array) && !result[0].nil?
            jwt = result[0]
            render json: { token: jwt, status: 'success', message: 'Connexion réussie' }, status: :ok
          else
            render json: { status: 'error', message: 'Erreur de génération du token' }, status: :internal_server_error
          end
        else
          render json: { status: 'error', message: 'Mauvais email ou mot de passe' }, status: :unauthorized
        end
      end
  
      private
  
      def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
  