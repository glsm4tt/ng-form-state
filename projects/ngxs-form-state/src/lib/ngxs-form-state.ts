import { inject } from '@angular/core';
import { GenricBaseFormState, DeepPartial } from '@appstrophe/ng-form-state';
import { Action, StateContext, Store } from '@ngxs/store';

export class PatchForm<T> {
  static readonly type = '[FORM] PatchForm';
  constructor(public form: T) {}
}

export abstract class GenricNgxsFormState<
  T extends Record<string, any>
> extends GenricBaseFormState<T> {
  private readonly store = inject(Store);

  @Action(PatchForm)
  patchForm({ patchState }: StateContext<T>, { form }: any): void {
    return patchState(form);
  }

  set(_patch: DeepPartial<T>) {
    this.store.dispatch(new PatchForm<T>(_patch as T));
  }
}
