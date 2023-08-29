class Api::ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_article, only: %i[show update destroy]
  before_action :verify_owner, only: [:update, :destroy]

  # GET /articles
  def index
    @articles = Article.includes(:user).all
    render json: @articles.to_json(include: :user)
  end
  

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create
    Rails.logger.info "Current User: #{current_user.inspect}"
    Rails.logger.info "Headers: #{request.headers['Authorization']}"
    @article = current_user.articles.build(article_params)

    if @article.save
      render json: @article, status: :created, location: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
  end

  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_article
    @article = Article.find(params[:id])
  end

  # Verify if the current user is the owner of the article.
  def verify_owner
    unless @article.user == current_user
      render json: { error: "Vous n'avez pas le droit de modifier cet article." }, status: :forbidden
    end
  end

  # Only allow a list of trusted parameters through.
  def article_params
    params.require(:article).permit(:title, :content)
  end
end
