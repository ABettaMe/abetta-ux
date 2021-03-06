import { Experiment } from "../contract/Experiment";
import {
  XYPlot,
  XAxis,
  YAxis,
  DiscreteColorLegend,
  HorizontalGridLines,
  LineMarkSeries,
} from "react-vis";
import Metric from "../contract/Metric";
import "./ExperimentDetails.css";
import AddMetric from "./AddMetric";
import React from "react";
import { render } from "@testing-library/react";
import { debug } from "console";
import { Link } from "react-router-dom";

interface IProps {
  experiment?: Experiment;
}

interface IState {
}

function transformMetricToGraph(metricsTreatment: Metric[] = []): any[] {
  let graphData: any[] = [];
  let dateTimeFormat = Intl.DateTimeFormat("en");
  if (metricsTreatment.length > 0 && metricsTreatment[0] != undefined) {
	let values = metricsTreatment[0].metricValues.sort((a, b) => {
		let dateA = new Date(a.dateRecorded);
		let dateB = new Date(b.dateRecorded);
		
		return dateA.getDate() - dateB.getDate();
	}); 
    values.forEach((value) => {
      graphData.push({
        x: dateTimeFormat.format(new Date((value.dateRecorded as any))),
        y: value.value,
      });
    });
  }
  return graphData;
}

export class ExperimentDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h2>
              {this.props.experiment?.name}{" "}
              <Link
                to={{
                  pathname: "/addMetric",
                  state: this.props.experiment
                }}
                className="button is-right is-small is-danger is-outlined"
              >
                Add metric
              </Link>
            </h2>
            <h5>{this.props.experiment?.dateCreated?.toUTCString()}</h5>

            <div className="columns">
              <div className="column">
                <h5>Treatment</h5>
                {this.props.experiment?.treatmentDescription}

				{!!this.props.experiment?.controlMetrics &&
              !!this.props.experiment.treatmentMetrics && (
                <div className="graph">
                  <XYPlot xType="ordinal" width={425} height={250}>
                    <HorizontalGridLines />
                    <LineMarkSeries
                      curve={"curveMonotoneX"}
                      data={transformMetricToGraph(
                        this.props.experiment.treatmentMetrics
                      )}
                    />
                    <XAxis />
                    <YAxis />
                  </XYPlot>
                </div>
              )}
              </div>
              <div className="column">
                <h5>Control</h5>
                {this.props.experiment?.controlDescription}
			 {!!this.props.experiment?.controlMetrics && (
                <div className="graph">
                  <XYPlot xType="ordinal" width={420} height={250}>
                    <HorizontalGridLines />
                    <LineMarkSeries
                      curve={"curveMonotoneX"}
                      data={transformMetricToGraph(
                        this.props.experiment.controlMetrics
                      )}
					  color="red"
                    />
                    <XAxis />
                    <YAxis />
                  </XYPlot>
                </div>
              )}
              </div>
            </div>

            <h5>Insights</h5>
            
        <div className="field">
          {
            !!this.props.experiment?.recommendations && this.props.experiment.recommendations.length > 0 && (
            <nav className="panel">
              <p className="panel-heading">Significant difference detected!</p>
              <div className="panel-block">
                Average value in Treatment: {this.props.experiment?.recommendations[0]?.treatmentAverage}
              </div>
              <div className="panel-block">
                Average value in Control: {this.props.experiment?.recommendations[0]?.controlAverage}
              </div>
              <div className="panel-block">
                p-Value: {this.props.experiment?.recommendations[0]?.pValue}
              </div>
            </nav>
          )}
        </div>
            
          </div>
        </div>
      </div>
    );
  }
}
