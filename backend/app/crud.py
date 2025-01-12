from sqlalchemy.orm import Session
from . import models, schemas


def get_posts(db: Session):
    return db.query(models.Post).all()


def get_post_by_id(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def create_post(db: Session, post: schemas.PostCreate):
    db_post = models.Post(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post_id: int, post_update: schemas.PostUpdate):
    # 게시글 ID로 게시글 가져오기
    post = get_post_by_id(db, post_id)
    if not post:
        return None

    # 수정할 필드 업데이트
    if post_update.title is not None:
        post.title = post_update.title
    if post_update.content is not None:
        post.content = post_update.content

    # 데이터베이스에 변경 사항 반영
    db.commit()
    db.refresh(post)

    return post


def delete_post(db: Session, post_id: int):
    # 게시글 ID로 게시글 가져오기
    post = get_post_by_id(db, post_id)
    if not post:
        return None

    # 데이터베이스에서 삭제
    db.delete(post)
    db.commit()

    return post
