// https://stackoverflow.com/questions/9017100/calculate-center-of-svg-arc
// https://github.com/Ghostkeeper/SVGToolpathReader/blob/a2bbe90da64e6cd9d54fec553f61ba941001e85d/Parser.py#L493
// @TODO Find a more reliable solution
import { Decimal } from 'decimal.js';
export function getArcCenter(
  _x1: number,
  _y1: number,
  _rx: number,
  _ry: number,
  _phi: 0 | 1,
  _fA: 0 | 1,
  _fS: 0 | 1,
  _x2: number,
  _y2: number
): {
  x: Decimal;
  y: Decimal;
} {
  if (_rx === 0 || _ry === 0) {
    // invalid arguments
    throw Error('rx and ry cannot be 0');
  }

  const x1 = new Decimal(_x1);
  const y1 = new Decimal(_y1);
  let rx = _rx < 0 ? new Decimal(-_rx) : new Decimal(_rx);
  let ry = _ry < 0 ? new Decimal(-_ry) : new Decimal(_ry);
  const x2 = new Decimal(_x2);
  const y2 = new Decimal(_y2);

  const s_phi = new Decimal(Math.sin(_phi));
  const c_phi = new Decimal(Math.cos(_phi));
  const hd_x = x1.minus(x2).dividedBy(2.0); // half diff of x
  const hd_y = y1.minus(y2).dividedBy(2.0); // half diff of y
  const hs_x = x1.add(x2).dividedBy(2.0); // half sum of x
  const hs_y = y1.add(y2).dividedBy(2.0); // half sum of y

  // F6.5.1
  const x1_ = c_phi.times(hd_x).add(s_phi.times(hd_y));
  const y1_ = c_phi.times(hd_y).minus(s_phi.times(hd_x));

  // F.6.6 Correction of out-of-range radii
  //   Step 3: Ensure radii are large enough
  const lambda = x1_
    .times(x1_)
    .dividedBy(rx.times(rx))
    .add(y1_.times(y1_).dividedBy(ry.times(ry)));

  if (lambda.greaterThan(1)) {
    rx = rx.times(lambda.sqrt());
    ry = ry.times(lambda.sqrt());
  }

  const rxry = rx.times(ry);
  const rxy1_ = rx.times(y1_);
  const ryx1_ = ry.times(x1_);
  const sum_of_sq = rxy1_.times(rxy1_).add(ryx1_.times(ryx1_)); // sum of square

  if (sum_of_sq.lessThanOrEqualTo(0)) {
    throw Error('start point can not be same as end point');
  }

  let coe = rxry.times(rxry).minus(sum_of_sq).dividedBy(sum_of_sq).abs().sqrt();
  if (_fA === _fS) {
    coe = coe.negated();
  }

  // F6.5.2
  const cx_ = coe.times(rxy1_).dividedBy(ry);
  const cy_ = coe.negated().times(ryx1_).dividedBy(rx);

  // F6.5.3
  const cx = c_phi.times(cx_).minus(s_phi.times(cy_)).add(hs_x);
  const cy = s_phi.times(cx_).add(c_phi.times(cy_)).add(hs_y);

  return {
    x: cx,
    y: cy,
  };
}
