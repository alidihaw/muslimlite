import { NgModule } from '@angular/core';
import { AorAnPipe } from './a-or-an.pipe';
import { FirstCasePipe } from './firstcase.pipe';
import { PrefixSuffixPipe } from './prefix-suffix.pipe';
import { ShortenPipe } from './shorten.pipe';
import { TimeAgoPipe } from './timeago.pipe';
import { TitlecasePipe } from './titlecase.pipe';
import { SafePipe } from './safe.pipe';
import { FuseFindByKeyPipe } from './find-by-key.pipe';
import { NamesPipe } from './names.pipe';

const PIPES = [NamesPipe, TimeAgoPipe, AorAnPipe, ShortenPipe, FirstCasePipe, TitlecasePipe, PrefixSuffixPipe, SafePipe, FuseFindByKeyPipe];

@NgModule({
    declarations: PIPES,
    imports: [],
    exports: PIPES,
})
export class NgxStringPipesModule {}

export { FuseFindByKeyPipe } from './find-by-key.pipe';
export { TimeAgoPipe } from './timeago.pipe';
export { ShortenPipe } from './shorten.pipe';
export { SafePipe } from './safe.pipe';
export { FirstCasePipe } from './firstcase.pipe';
export { TitlecasePipe } from './titlecase.pipe';
export { PrefixSuffixPipe } from './prefix-suffix.pipe';
export { AorAnPipe } from './a-or-an.pipe';
export { NamesPipe } from './names.pipe';
