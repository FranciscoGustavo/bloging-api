import { Router } from 'express';
import passport from 'passport';
import { UsersController } from './controller';

export class UsersRouter {
  constructor(
    private router: Router,
    private controller: UsersController
  ) {    
    this.router.route('/users/posts')
      .get(
        passport.authenticate('jwt', { session: false }),
        this.controller.findAllPosts
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        this.controller.createPost
      );
    
    this.router.route('/users/posts/:id')
      .get(
        passport.authenticate('jwt', { session: false }),
        this.controller.findOnePost
      )
      .patch(
        passport.authenticate('jwt', { session: false }),
        this.controller.update
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        this.controller.destroy
      );
  }
}