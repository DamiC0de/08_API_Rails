class JwtDenylist < ApplicationRecord
    include Devise::JWT::RevocationStrategies::Denylist
  
    self.table_name = 'jwt_denylist'
  
    belongs_to :user
  
    validates :jti, presence: true
    validates :exp, presence: true
  
    # Recherche d'un jeton JWT dans la liste des jetons révoqués
    def self.jwt_revoked?(payload, user)
      self.exists?(jti: payload['jti'])
    end
  
    # Revoque un jeton JWT (l'ajoute à la liste des jetons révoqués)
    def self.revoke_jwt(payload, user)
      self.create!(jti: payload['jti'], exp: Time.at(payload['exp']).to_datetime)
    end
  end
  