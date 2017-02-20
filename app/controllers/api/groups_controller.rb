class Api::GroupsController < ApplicationController

  def index
    @groups = Group.all.includes(:users)
    render :index
  end

  def create

    unless logged_in?
      render json: ["must log in first"]
    end

    @group = current_user.groups.new(group_params)
    if @group.save
      Organizer.create(group_id: @group.id, user_id: current_user.id)
      Membership.create(group_id: @group.id, user_id: current_user.id)
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.find(params[:id])

    if @group
      render :show
    else
      render json: ["Group not found"], status: 404
    end
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def destroy
    @group = Group.find(params[:id])
    unless @group.destroy
      render json: @group.errors.full_messages, status: 422
    end
  end

  # def join
  #   group_id = params[:group_id].to_i
  #   @new_membership = current_user.memberships.new(group_id: group_id)
  #   if @new_membership.save!
  #     @users = Group.find(group_id).users
  #     # render 'api/users/index'
  #     render :show
  #   else
  #     render json: @new_membership.errors.full_messages, status: 422
  #   end
  # end

  private
  def group_params
    params.require(:group).permit(:name, :description, :category, :location, :member_count, :about, :founded)
  end
end
