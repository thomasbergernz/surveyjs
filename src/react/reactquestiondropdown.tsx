﻿/// <reference path="../survey.ts" />
/// <reference path="../question_dropdown.ts" />
/// <reference path="../../typings/index.d.ts" />
class ReactSurveyQuestiondropdown extends React.Component<any, any> {
    private question: Survey.QuestionDropdownModel;
    protected css: any;
    protected rootCss: any;

    constructor(props: any) {
        super(props);
        this.question = props.question;
        this.css = props.css;
        this.rootCss = props.rootCss;
        this.state = { value: this.question.value };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event) {
        this.question.value = event.target.value;
        this.setState({ value: this.question.value });
    }
    componentWillReceiveProps(nextProps: any) {
        this.question = nextProps.question;
        this.css = nextProps.css;
        this.rootCss = nextProps.rootCss;
    }
    render(): JSX.Element {
        if (!this.question) return null;
        var options = [];
        for (var i = 0; i < this.question.visibleChoices.length; i++) {
            var item = this.question.visibleChoices[i];
            var key = "item" + i;
            var option = <option key={key} value={item.value}>{item.text}</option>;
            options.push(option);
        }
        var comment = this.question.value === this.question.otherItem.value ? this.renderOther() : null;
        return (
            <div>
            <select className={this.css} value={this.state.value} onChange={this.handleOnChange}>
              <option value="">{this.question.optionsCaption}</option>
              {options}
            </select>
            {comment}
            </div>
        );
    }
    protected renderOther(): JSX.Element {
        var style = { marginTop: "3px" };
        return <div style={style}><ReactSurveyQuestionCommentItem question={this.question} css={this.rootCss}/></div>;
    }
}