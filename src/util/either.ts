export type EitherCallback<T, U> = (r: T) => Promise<U>

export type Either<L, R> = Left<L> | Right<R>

export abstract class EitherClass<L, R> {
  public abstract isRight(): boolean
  public abstract isLeft(): boolean
  public abstract unpack(): L | R
  public abstract chain<T>(func: (arg: L | R) => T): T
}

export class Left<L> implements EitherClass<L, never> {
  protected left: L
  constructor(left: L) {
    this.left = left
  }
  public isRight(): this is Right<never> {
    return false
  }
  public isLeft(): this is Left<L> {
    return true
  }
  public unpack(): L {
    return this.left
  }
  public chain<T>(func: (arg: L) => T): T {
    return func(this.left)
  }
}

export class Right<R> implements EitherClass<never, R> {
  protected right: R
  constructor(right: R) {
    this.right = right
  }
  public isRight(): this is Right<R> {
    return true
  }
  public isLeft(): this is Left<never> {
    return false
  }
  public unpack(): R {
    return this.right
  }
  public chain<T>(func: (arg: R) => T): T {
    return func(this.right)
  }
}

export class EitherFactory<L, R> {
  public left(l: L): Left<L> {
    return new Left(l)
  }
  public right(r: R): Right<R> {
    return new Right(r)
  }
}
