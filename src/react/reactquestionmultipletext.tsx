﻿/// <reference path="../survey.ts" />
/// <reference path="../question_multipletext.ts" />
/// <reference path="../../typings/index.d.ts" />
class ReactSurveyQuestionmultipletext extends React.Component<any, any> {
    private question: Survey.QuestionMultipleTextModel;
    protected css: any;
    constructor(props: any) {
        super(props);
        this.question = props.question;
        this.css = props.css;
    }
    componentWillReceiveProps(nextProps: any) {
        this.question = nextProps.question;
        this.css = nextProps.css;
    }
    render(): JSX.Element {
        if (!this.question) return null;
        var tableRows = this.question.getRows();
        var rows = [];
        for (var i = 0; i < tableRows.length; i++) {
            rows.push(this.renderRow("item" + i, tableRows[i]));
        }
        return (
            <table className={this.css.root}>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
    protected renderRow(key: string, items: Array<Survey.MultipleTextItemModel>) {
        var tds = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            tds.push(<td key={"label" + i}><span className={this.css.itemTitle}>{item.title}</span></td>);
            tds.push(<td key={"value" + i}>{this.renderItem(item)}</td>);
        }
        return <tr key={key}>{tds}</tr>;
    }
    protected renderItem(item: Survey.MultipleTextItemModel): JSX.Element {
        return <ReactSurveyQuestionmultipletextItem item={item} css={this.css} />;
    }
}

class ReactSurveyQuestionmultipletextItem extends React.Component<any, any> {
    private item: Survey.MultipleTextItemModel;
    protected css: any;
    constructor(props: any) {
        super(props);
        this.item = props.item;
        this.css = props.css;
        this.state = { value: this.item.value };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event) {
        this.item.value = event.target.value;
        this.setState({ value: this.item.value });
    }
    componentWillReceiveProps(nextProps: any) {
        this.item = nextProps.item;
        this.css = nextProps.css;
    }
    render(): JSX.Element {
        if (!this.item) return null;
        var style = { float: "left" };
        return (<input  className={this.css.itemValue} style={style} type="text" value={this.state.value} onChange={this.handleOnChange} />);
    }
    protected get mainClassName(): string { return ""; }
}