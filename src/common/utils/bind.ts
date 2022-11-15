import type { FC } from "react";
import { createElement, memo } from "react";

type Controller<Props, Result> = (props: Props) => Result;

type Option = { shouldMemo?: boolean };

export function bind<
  Props extends Record<string, unknown>,
  ControllerResult extends {}
>(
  Controller: Controller<Props, ControllerResult>,
  ViewComponent: FC<ControllerResult>,
  option?: Option
) {
  const { shouldMemo } = option ?? {};

  if (shouldMemo) {
    const MemoizedViewComponent = memo(ViewComponent) as FC<ControllerResult>;
    const BoundComponent = createBoundComponent<Props, ControllerResult>(
      MemoizedViewComponent,
      Controller
    );
    return memo(BoundComponent);
  }

  return createBoundComponent<Props, ControllerResult>(
    ViewComponent,
    Controller
  );
}

function createBoundComponent<Props, ControllerResult extends {}>(
  BaseComponent: FC<ControllerResult>,
  controller: Controller<Props, ControllerResult>
) {
  return (props: Props) =>
    createElement<ControllerResult>(BaseComponent, controller(props));
}
